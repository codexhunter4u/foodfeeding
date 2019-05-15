<?php

    /*
     * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
     * @date : 13/05/19 
     * @desc : This is feeder child class of gameChanger to manage the game logic
     * @param : $request{object}
     * @return : $result{object}
    */
    include_once'gamechanger.php';
    class feeder extends gameChanger{

        public function __construct($request){
            parent::__construct($request);
            $method = $request['action'];
            $this->$method();
        }

        /*Getter : to get the count*/
        public function getCount(){
            return $this->count;
        }

        /*
         * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
         * @date : 13/05/19 
         * @desc : Check the counter and set the Total turn. for cow = 10 , farmer = 1, for bunnies = 8.
            if the count reach at its total turn then increase the counter by 1. For next cycle for each animals
         * @param : array
        */
        public function manageObject(){

            $count = $this->getCount();
            $iteration = [];
            if(($this->bunnyIterationCount * $this->bunnyTurn) == $count){
                $this->bunnyIterationCount += 1;
                $iteration['bunnyCount'] = $this->bunnyIterationCount;
                $this->setDeadAnimal($this->defaultArray['bunnies']);
            }else{
                $iteration['bunnyCount'] = $this->bunnyIterationCount;
            }

            if(($this->cowIterationCount * $this->cowTurn) == $count){
                $this->cowIterationCount += 1;
                $iteration['cowCount'] = $this->cowIterationCount;
                $this->setDeadAnimal($this->defaultArray['cow']);
            }else{
                $iteration['cowCount'] = $this->cowIterationCount;
            }

            if(($this->farmerIterationCount * $this->farmerTurn) == $count){
                $this->farmerIterationCount += 1;
                $iteration['farmerCount'] = $this->farmerIterationCount;
                $this->setDeadAnimal($this->defaultArray['farmer']);
            }else{
                $iteration['farmerCount'] = $this->farmerIterationCount;
            }

            $this->defaultArray['iteration'] = $iteration;
            $resultReturn = $this->defaultArray;
            echo json_encode($resultReturn,true);
        }

        /*
         * @author : Mohan Jadhav<mohan212jadhav@gmail.com>
         * @date : 13/05/19 
         * @desc : Set the Dead animals list. If the animals are not feeded withing its total turn
         * @param : array
        */
        public function setDeadAnimal($deadAnimals){

            $deadList = [];
            foreach ($deadAnimals as $key => $val) {
                
                if($val == 0)
                    $deadList[$key] = $key;
            }
            $this->defaultArray['deadAnimalList'] = $deadList;
            
        }

    }

    $inputData = $_POST['inputData'];
    $obj = new feeder($inputData);
        
?>