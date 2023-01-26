export class Board {
    public table: Array<Array<0 | 1 | 2>>;
    constructor(private width: number, private height: number, private goal: number) {
        this.table = new Array(width);
        for (let i = 0; i < this.table.length; i++) {
            this.table[i] = new Array(height);

            for (let k = 0; k < this.table[i].length; k++) {
                this.table[i][k] = 0;
            }
        }
    }

    CheckForWin(from: [number, number], player: 1 | 2): boolean {
        const column = from[0];
        const row = from[1];
        let win = false,
            counter = 0;

        for (let i = 0; i < this.height; i++) {
            if (this.table[column][i] == player) counter++;
            else counter = 0;
            if (counter >= this.goal) {
                win = true;
                break;
            }
        }
        if (win) return win;
        counter = 0;
        for (let i = 0; i < this.width; i++) {
            //console.log(`${this.table[i][row]} == ${player}, row: ${row} col: ${i}`);
            if (this.table[i][row] == player) {
                counter++;
                //console.log(`counter up ${player}:${counter}`);
            } else {
                counter = 0;
            }
            if (counter >= this.goal) {
                win = true;
                break;
            }
        }
        if (win) return win;
        counter = 0;
        let startpoint: [number, number] = [0, 0];
        for (let col = column, ro = row; col >= 0 && ro >= 0; col--, ro--) {
            startpoint = [col, ro];
        }
        for (let [col, ro] = startpoint; col < this.width && ro < this.height; col++, ro++) {
            if (this.table[col][ro] == player) counter++;
            else counter = 0;
            if (counter >= this.goal) {
                win = true;
                break;
            }
        }
        if (win) return win;
        counter = 0;
        for (let col = column, ro = row; col < this.width && ro >= 0; col++, ro--) {
            startpoint = [col, ro];
        }
        for (let [col, ro] = startpoint; col >= 0 && ro < this.height; col--, ro++) {
            if (this.table[col][ro] == player) counter++;
            else counter = 0;
            if (counter >= this.goal) {
                win = true;
                break;
            }
        }

        return win;
    }
}
