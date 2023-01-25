export class Board {
    public table: Array<Array<number>>;
    constructor(private width: number, private height: number, private goal: number) {
        this.table = new Array(width);
        for (let i = 0; i < this.table.length; i++) {
            this.table[i] = new Array(height);

            for (let k = 0; k < this.table[i].length; k++) {
                this.table[i][k] = 0;
            }
        }
    }

    CheckForWin(): boolean {
        /* TODO */
        return false;
    }
}
