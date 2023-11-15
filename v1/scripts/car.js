class Car{
    brand;
    number;
    color;
    mass;//tons
    prodDate;//production date(the date car was producted)
    engineType;
    fines;
    unpaidFines;

    constructor(){
        this.brand = 'Unknown'
        this.number = 'Unknown'
        this.color = 'Unknown'
        this.mass = 'Unknown'
        this.prodDate = 'Unknown'
        this.engineType = 'Unknown'
        this.fines = 'Unknown'
        this.unpaidFines = 'Unknown'
    }

    setBrand(val){
        this.brand = val;
    }

    setColor(val){
        this.color = val;
    }

    setMass(val){
        if(isNaN(+val)){}
        else if(+val < 0){}
        else{
            this.mass = val;
        }
    }

    setProdDate(date){
        let setDate = new Date(date);
        if(!isNaN(new Date(date))){
            this.prodDate = setDate;
        }
    }

    setNumber(val){
        this.number = val;
    }

    setFines(val){
        if(!isNaN(+val)){
            this.fines = +val;
        }
    }


    setUnpaidFines(val){
        if(!isNaN(+val) && +val <= this.fines){
            this.unpaidFines = +val;
        }
    }

    setEngineType(option){
        switch(+option){
            case 1:{
                this.engineType = 'petrol'
                break
            }
            case 2:{
                this.engineType = 'diesel'
                break
            }
            case 3:{
                this.engineType = 'electric'
                break
            }
            case 4:{
                this.engineType = 'hybrid'
                break
            }
        }
    }
}

module.exports = Car;