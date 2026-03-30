class Exams {
  constructor(answer, weight) {
    this.answer = answer;
    this.weight = weight;
    this.exams = [];
  }

  add(exam) {
    this.exams.push(exam);
  }

  getScores() {
    return this.exams.map((examAnswers) => {
      let score = 0;
      for (let i = 0; i < examAnswers.length; i++) {
        if (examAnswers[i] === this.answer[i]) {
          const w = this.weight && this.weight[i] !== undefined ? this.weight[i] : 1;
          score += w;
        }
      }
      return score;
    });
  }

  avg() {
    const scores = this.getScores();
    if (scores.length === 0){
        return 0;
    }
    const sum = scores.reduce((a, b) => a + b, 0);
    return sum / scores.length;
  }

  min(count = 1) {
    const scores = this.getScores();
    return scores.sort((a, b) => a - b).slice(0, count);
  }

  max(count = 1) {
    const scores = this.getScores();
    return scores.sort((a, b) => b - a).slice(0, count);
  }

  lt(limit) {
    const scores = this.getScores();
    return scores.filter((score) => score < limit);
  }

  gt(limit) {
    const scores = this.getScores();
    return scores.filter((score) => score > limit);
  }
}

const pweb2 = new Exams(["a", "b", "a", "c", "d"], [2, 2, 2, 2, 2]);

pweb2.add(["a", "b", "a", "b", "b"]);
pweb2.add(["a", "b", "b", "b", "b"]);
pweb2.add(["a", "b", "a", "c", "b"]);
pweb2.add(["a", "b", "a", "c", "d"]);

console.log("Notas:", pweb2.getScores());
console.log("Média:", pweb2.avg());
console.log("Menor nota:", pweb2.min());
console.log("Maior nota:", pweb2.max());
console.log("Notas menores que 5:", pweb2.lt(5));
console.log("Notas maiores que 5:", pweb2.gt(5));