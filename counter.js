class Counter {
	#value = 0;

	increment() {
		this.#value++;
		return this.#value;
	}

	decrement() {
		this.#value--;
		return this.#value;
	}

	getValue() {
		return this.#value;
	}
}

const myCounter = new Counter();

myCounter.increment();
myCounter.increment();
myCounter.decrement();

console.log(myCounter.getValue());