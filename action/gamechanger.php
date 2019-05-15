<?php
/*
 * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
 * @date : 13/05/19 
 * @desc : This is gameChanger parent class to manage default and basic pre-recurites logic of game
 * @param : $request{object}
 * @return : $result{object}
*/
class gameChanger{

    public $defaultArray;
    public $count;
    protected $farmerIterationCount;
    protected $cowIterationCount;
    protected $bunnyIterationCount;
    public $bunnyTurn = 8;
    public $cowTurn = 10;
    public $farmerTurn = 15;

    public function __construct($request){
        $this->setCount($request);
        $this->feedRandom();
    }

    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : Calculation of all animals counts also manage the dead animals and feeded animals
     * @param : $request{object}
     * @return : $result{object}
    */
    public function feedRandom(){
        
        $objArray = $this->defaultArray;
        unset($objArray['iteration']);
        foreach($objArray as $key => $val){

            if($key==='farmer'){
                $farmer = $val;
            }else if($key==='bunnies'){
                $bunnies = $val;
            }else if($key==='cow'){
                $cow = $val;
            }
        }

        $animal = array_rand($objArray);
        $key = array_rand($objArray[$animal]);
        $objArray[$animal][$key] = 1;
        $affectedArray = $objArray[$animal];

        $this->defaultArray['farmer'] = ($animal === 'farmer') ? $affectedArray : $farmer;
        $this->defaultArray['bunnies'] = ($animal === 'bunnies') ? $affectedArray : $bunnies;
        $this->defaultArray['cow'] = ($animal === 'cow') ? $affectedArray : $cow;

    }

    /*Setter : Sett the array values,count etc to pre-defind variable*/
    public function setCount($request){

        $iterationRow = $request['defaultAnimals']['iteration'];
        $this->count = $request['count'];
        $this->farmerIterationCount = $iterationRow['farmerCount'];
        $this->cowIterationCount = $iterationRow['cowCount'];
        $this->bunnyIterationCount = $iterationRow['bunnyCount'];
        $this->defaultArray = $request['defaultAnimals'];
    }

}