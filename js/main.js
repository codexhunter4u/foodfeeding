/*
 * @date : 13/05/19;
 * @author : Mohan Jadhav(mohan212jadhav@gmail.com);
 * @desc : This the main JS file to apply the logic on gameLoader.
 * All pre-defind function and other logic to start and end the game.
 */

$(document).ready(function() {
   
    var turns = 50; // Total turns
    var clicks = 0; // number of clicks
    var count = 0; // counts for click
    setDefaultJson(); // set the default data to hidden fileds

    var bunnyTurn = 0;
    var cowTurn = 0;
    var farmerTurn = 0;
    $("body").unblock();

    /* Start the game.Also handle the pre-recurities data*/
    $(".startGame").click(function () {
        preLoader('Game starting...',800);
        $(".btnFeed").removeClass("InActive").addClass("active");
        $(".img-thumbnail").removeClass("blur");
        $('.btnFeed').prop("disabled", false);
        $(".startGame").addClass("InActive").attr("disabled", true);
    });

    /* Send the request to server to manage the game logic*/
    $(".btnFeed").click(function(e) {
        e.preventDefault();
        
        clicks += 1; // Click counter
        if(clicks >= 0 && clicks <= turns){
            $(".counter").text(turns - clicks);
            $(".counter").css('color','#f54d4d');
            count = (clicks===turns) ? 0 : clicks;
            dataString = {
                count: count, 
                action: 'manageObject',
                defaultAnimals : JSON.parse($('#animalsData').val())
            };
            $.ajax({
                type: "POST",
                url: "././action/action.php",
                data: { inputData: dataString },
                success: function(result) {
                    //console.log(result);return;
                    var data = JSON.parse(result);
                    $('#animalsData').val(JSON.stringify(data)); // Assign the return result to hidden filed to avoid the value override.
                    //console.log(result);
                    //return;
                    $.each(data, function(key1, value) {
                        $.each(value, function(key, val) {

                            if(key1 == 'deadAnimalList'){
                                killAnimals(key);
                            }
                            manageObject(key,val,key1);
                        });
                    });
                    //resetAnimals(count,data);
                },
                error: function(result) {
                    alert('Error in request');
                }
            });		

            if(clicks === turns ){
                gameOver();
            }

        }
    });

    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : On load of the game manage the images and set the attributes
     * @param : kay{string}, val{string}, kay1{string}
     * @return : null.
    */
    function manageObject(key,val,key1){
        $.trim(key);
        var set = $.trim($("#"+key).attr('data-'+key));
        //console.log(val);
        if(val == 1 && set== 1){
            
            $("#"+key).css('background-color','#41e418');
            $("#"+key).fadeOut(1400, function () {
                $(this).attr("src","images/feedy-"+key1+".jpg");            
                $(this).fadeIn(1600);
            });
            console.log(key);
            $("#"+key).attr('data-'+key,'0').removeClass("blur", true);
            //$("#"+key).removeClass('blur');
        }
    }

    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : Mark images as dead/kill and disapper the images for next process.
     * @param : null
     * @return : null.
    */
    function killAnimals(key){
        $.trim(key);
        
        if(key=='farmer'){
            gameOver();
        }else{
            $("#"+key).addClass("blur");
            $("#"+key).attr("src","images/dead.jpg");
        }
    }

    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : End the game and clear the all old data.
     * @param : null
     * @return : null.
    */
    function gameOver(){
        preLoader('Game over...',800);
        $(".counter").css('color','#fff').text(50);
        $(".img-thumbnail").addClass("blur");
        $(".btnFeed").addClass("InActive")
        $('.btnFeed').prop("disabled", true);
        $('.startGame').removeClass("InActive", true);
        $('.startGame').prop("disabled", false);
        $(".afterResetFarmerImage").attr("src","images/farmer-not-feed.jpg");
        $(".afterResetBunnyImage").attr("src","images/bunny-not-feed.jpg");
        $(".afterResetCowImage").attr("src","images/cow-not-feed.jpg");
        $(".img-thumbnail").css('background-color','#fff');
        clicks = 0;
        count = 0;
    }

    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : Set the default value to hidden fields to initiate the game.
     * @param : null
     * @return : null.
    */
    function setDefaultJson(){
        var elems = {
            "farmer":{"farmer":0}, 
            "bunnies":{"bunny_1":0,"bunny_2":0},
            "cow":{"cow_1":0,"cow_2":0,"cow_3":0,"cow_4":0},
            "iteration":{"bunnyCount":1,"cowCount":1,"farmerCount":1},
            "deadAnimalList" : {},
        };   
        $('#animalsData').val(JSON.stringify(elems));
    }

    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : Pre loader
    */
    function preLoader(text,duration){

        $.blockUI({
            message : text, 
            css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff',
            } 
        }); 
        setTimeout($.unblockUI, duration);
    }


    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : Reset the all animals array to zero after their trurn complete.
    */
    function resetAnimals(count,data){

        var farmer = {};
        var bunnies = {};
        var cow = {};
        var iteration ={};
        var deadAnimalList = {};
        var elems = {};

        $.each(data, function(key1, value) {
            
            $.each(value, function(key, val) {
                
                if((key1 == 'farmer') && (count % 15) == 0){
                    farmer[key] = 0;
                }else{
                    farmer[key] = val;
                }

                if((key1 == 'bunnies') && (count % 8) == 0){
                    bunnies[key] = 0;
                }else{
                    bunnies[key] = val;
                }

                if((key1 == 'cow') && (count % 10) == 0){
                    cow[key] = 0;
                }else{
                    cow[key] = val;
                }

                if(key1 == 'deadAnimalList'){
                    deadAnimalList[key] = val;
                }

                if(key1 == 'iteration'){
                    iteration[key] = val;
                }

            });
        });
        
        elems['farmer'] = farmer;
        elems['bunnies'] = bunnies;
        elems['cow'] = cow;
        elems['iteration'] = iteration;
        elems['deadAnimalList'] = deadAnimalList;

        $('#animalsData').val(JSON.stringify(elems));
    }

});  