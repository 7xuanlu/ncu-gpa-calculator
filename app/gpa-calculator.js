'use strict';

/**
 * Calculate GPA and accumulate value
 * GPA = sigma(Grade points * credit hours) / sigma(credit hours)
 * Class
 */
export default class GPACalculator {
    #gpa;
    #accuGradePoints;
    #accuCredits;
    constructor() {
        this.#gpa = 0;
        this.#accuGradePoints = 0;
        this.#accuCredits = 0;
    }

    get gpa() { return this.#gpa; }

    set gpa(gpa) { this.#gpa = gpa; }

    get accuGradePoints() { return this.#accuGradePoints; }

    set accuGradePoints(accuGradePoints) { this.#accuGradePoints = accuGradePoints; }

    get accuCredits() { return this.#accuCredits; }

    set accuCredits(accuCredits) { this.#accuCredits = accuCredits; }

    // Convert score to point
    scoreToPoint(score) {
        let point;
        switch (true) {
            case (score >= 90):
                point = 4.3;
                break;
            case (score < 90 && score >= 85):
                point = 4;
                break;
            case (score < 85 && score >= 80):
                point = 3.7;
                break;
            case (score < 80 && score >= 77):
                point = 3.3;
                break;
            case (score < 77 && score >= 73):
                point = 3;
                break;
            case (score < 73 && score >= 70):
                point = 2.7;
                break;
            case (score < 70 && score >= 67):
                point = 2.3;
                break;
            case (score < 67 && score >= 63):
                point = 2;
                break;
            case (score < 63 && score >= 60):
                point = 1.7;
                break;
            case (score < 60 && score >= 50):
                point = 1;
                break;
            case (score === 0):
                point = 0;
                break;
            default:
                point = NaN;
        }
        return point;
    }

    // Accumulate score and credit
    accumulate(score, credit) {
        console.log(`Score is ${score}, Credit is ${credit}`);
        credit = parseInt(credit); // Parse string to int
        let point = this.scoreToPoint(score);
        let gradePoint = point * credit; // string * string = int

        if (isNaN(gradePoint)) return; // Check if the input gradePoint is valid
        else {
            this.accuGradePoints += gradePoint;
            this.accuCredits += credit;
            this.gpa = (this.accuGradePoints / this.accuCredits).toFixed(2); // Round to two decimals
            console.log(`Grade point average is ${this.gpa}`);
        }
    }
}
