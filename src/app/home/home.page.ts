import { Component } from "@angular/core";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	distances: number[][] = [];

	sumDistances: number = 0.0;

	pointName: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

	selectedIndex1: number = -1;

	selectedIndex2: number = -1;

	constructor() {
		this.setDistance();
	}

	setDistance() {
		console.log(this.selectedIndex1);
		for (let i = 0; i < 10; i++) {
			this.distances.push([]);
			for (let j = 0; j < 10; j++) {
				this.distances[i].push();
				if (i === j) {
					this.distances[i][j] = 0;
				} else {
					this.distances[i][j] = this.getRandomInt();
				}
			}
		}
		console.log(this.distances);
	}

	selectDistance(index: number, type: number) {
		switch (type) {
			case 1: {
				this.selectedIndex1 = index;
				break;
			}
			case 2: {
				this.selectedIndex2 = index;
				break;
			}
		}
	}

	getRandomInt() {
		return Math.floor(Math.random() * 10);
	}

	compareDistance(array: number[]) {
		const minDistance = array.reduce(
			(acc: { [x: string]: number }, curr, index) => {
				if (curr !== 0) {
					if (!acc) {
						return { [index]: curr };
					}
					for (let accVal of Object.values(acc)) {
						if (accVal < curr) {
							return acc;
						} else {
							return { [index]: curr };
						}
					}
				}
			},
			{}
		);

		return minDistance;
	}

	async startCalculation() {
		const selectedDistance = this.distances[this.selectedIndex1][
			this.selectedIndex2
		];
		const compareDistance =
			this.sumDistances -
			this.distances[this.selectedIndex1][this.selectedIndex2];
		await new Promise((resolve) => {
			const result = this.compareDistance(this.distances[this.selectedIndex1]);
			const resultKey = Object.keys(result)[0];
			if (Number(resultKey) === this.selectedIndex2) {
				resolve(true);
			} else {
				let count: number = 0;
				let whileResultKey: string = "";
				this.sumDistances += result[Number(resultKey)];

				try {
					while (true) {
						const whileResult = this.compareDistance(
							this.distances[
								count !== 0 ? Number(whileResultKey) : Number(resultKey)
							]
						);
						whileResultKey = Object.keys(whileResult)[0];

						this.sumDistances += whileResult[Number(whileResultKey)];

						if (whileResult[Number(whileResultKey)] === this.selectedIndex2) {
							resolve(true);
						}
						count++;
					}
				} catch {
					resolve(true);
				}
			}
		});

		if (selectedDistance !== 0) {
			if (compareDistance < 0) {
				this.sumDistances = selectedDistance;
			}
		}
	}
}
