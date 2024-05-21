import { Choice } from "../interfaces/generala.interface";

export class GeneralaChart {
    [key: string]: any;
    v1: number | null = 0; 
    v2: number | null = 0;
    v3: number | null = 0;
    v4: number | null = 0;
    v5: number | null = 0;
    v6: number | null = 0;
    vEscalera: number | null = 0;
    vFull: number | null = 0;
    vPoker: number | null = 0;
    vGenerala: number | null = 0;
    vDoble: number | null = 0;
    vTotal: number = 0;
    rollCount: number = 0;

    getChoices(dices: number[]) : Choice[] {
        this.rollCount++;

        const dicesInfo = new DicesInfo(dices);
        const choices = this.getNumericChoices(dicesInfo);
        
        const escalera = this.getEscaleraChoice(dicesInfo);
        if (escalera)
            choices.push(escalera);

        const full = this.getFullChoice(dicesInfo);
        if (full)
            choices.push(full);

        const poker = this.getPokerChoice(dicesInfo);
        if (poker)
            choices.push(poker);

        const generala = this.getGeneralaChoice(dicesInfo);
        if (generala)
            choices.push(generala);

        return choices;
    }

    getNumericChoices (dicesInfo: DicesInfo) : Choice[] {
        const choices : Choice[] = [];
        const chartValues = Object.values(this);
        const values = Object.values(dicesInfo);
        for (let i = 0; i < values.length; i++) {
            if(chartValues[i] != null && chartValues[i] == 0 && values[i] > 0)
            {
                const num = i + 1;
                const val = num * values[i];
                choices.push({name: num.toString(), property: `v${num}`, value: val})
            }
            
        }

        return choices;
    }


    getEscaleraChoice(dI : DicesInfo) : Choice | null  {
        if (this.vEscalera == null || this.vEscalera! > 0) return null;
        const hasMiddleNumber = dI.c2 > 0 && dI.c3 > 0 && dI.c4 > 0 && dI.c5;
        let hasEscalera = false;
        if (hasMiddleNumber && dI.c1 > 0 || hasMiddleNumber && dI.c6 > 0) 
            hasEscalera = true;

        if (hasEscalera) 
            if(this.rollCount == 1)
                return {name: "Escalera Servida", property: `vEscalera`, value: 25};
            else
                return {name: "Escalera", property: `vEscalera`, value: 20};
       
        return null;
    }

    getFullChoice(dI: DicesInfo) : Choice | null {
        if (this.vFull == null || this.vFull! > 0) return null;

        let has2 = false;
        let has3 = false;

        const values = Object.values(dI);
        for (let count of values) {
            if (count >= 3)
                has3 = true;
            else if (count >= 2)
                has2 = true;
        }

        if (has2 && has3)
            if(this.rollCount == 1)
                return {name: "Full Servida", property: `vFull`, value: 35};
            else
                return {name: "Full", property: `vFull`, value: 30};
        return null;
    }

    getPokerChoice(dI: DicesInfo) : Choice | null {
        if (this.vPoker == null || this.vPoker! > 0) return null;
        let has4 = false;
        const values = Object.values(dI);
        for (let count of values) {
            if (count >= 4)
            {
                has4 = true;
                break;
            }
        }

        if (has4)
            if(this.rollCount == 1)
                return {name: "Poker Servido", property: `vPoker`, value: 45};
            else
                return {name: "Poker", property: `vPoker`, value: 40};
        return null;
    }

    getGeneralaChoice(dI: DicesInfo) : Choice | null {
        if (this.vGenerala == null) return null;
        let has5 = false;
        const values = Object.values(dI);
        for (let count of values) {
            if (count >= 5)
            {
                has5 = true;
                break;
            }
        }

        if (has5)
        {
            if(this.vGenerala! == 0)
            {
                
                if(this.rollCount == 1)
                    return {name: "Generala Servida", property: `vGenerala`, value: 55};
                else
                    return {name: "Generala", property: `vGenerala`, value: 50};
            }
            else
            {
                if (this.vDoble != null && this.vDoble == 0)
                    if(this.rollCount == 1)
                        return {name: "Doble Servida", property: `vGenerala`, value: 105};
                    else
                        return {name: "Doble", property: `vGenerala`, value: 100};
            }
        }

        return null;
    }

    chose(choice: Choice) : boolean{
        let didChange = false;
        const val = this[choice.property];
        if (val != null && val == 0)
        {
            this[choice.property] = choice.value
            didChange = true;
            if (choice.value)
                this.vTotal += choice.value;
        }
        return didChange;
    }
}


class DicesInfo {
    c1: number = 0;
    c2: number = 0;
    c3: number = 0;
    c4: number = 0;
    c5: number = 0;
    c6: number = 0;

    constructor(dices: number []) {
        for (let dice of dices) {
            switch (dice) {
                case 1:
                    this.c1++;
                    break;
                case 2:
                    this.c2++;
                    break;
                case 3:
                    this.c3++;
                    break;
                case 4:
                    this.c4++;
                    break;
                case 5:
                    this.c5++;
                    break;
                case 6:
                    this.c6++;
                    break;
            }
        }
    }
}