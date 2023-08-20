class Pet {
    constructor(public name: string, public type: string, public age: number, public gender: string, public color: string) { }
}

class PetManager {
    private pets: Pet[] = [];

    constructor(private petListElement: HTMLElement, private createPetButton: HTMLButtonElement) {
        this.loadPetsFromLocalStorage();

        this.createPetButton.addEventListener('click', () => {
            this.createPet();
            this.updatePetList();
            this.savePetsToLocalStorage();
        });

        this.updatePetList();
    }

    createPet() {
        const petNameInput = document.getElementById('pet-name') as HTMLInputElement;
        const petTypeInput = document.getElementById('pet-type') as HTMLSelectElement;
        const petAgeInput = document.getElementById('pet-age') as HTMLInputElement;
        const petGenderInput = document.getElementById('pet-gender') as HTMLSelectElement;
        const petColorInput = document.getElementById('pet-color') as HTMLInputElement;

        const petName = petNameInput.value;
        const petType = petTypeInput.value;
        const petAge = parseInt(petAgeInput.value);
        const petGender = petGenderInput.value;
        const petColor = petColorInput.value;

        if (petName.trim() === '' || petType.trim() === '' || isNaN(petAge) || petGender.trim() === '' || petColor.trim() === '') {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        const newPet = new Pet(petName, petType, petAge, petGender, petColor);
        this.pets.push(newPet);

        // Clear input fields after adding a pet
        petNameInput.value = '';
        petAgeInput.value = '';
        petColorInput.value = '';
    }

    updatePetList() {
        this.petListElement.innerHTML = '';
        this.pets.forEach((pet, index) => {
            const petItem = document.createElement('li');
            petItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            petItem.innerHTML = `
                <span>${pet.name} (${pet.type}) - ${pet.age} yaş, ${pet.gender}, Renk: ${pet.color}</span>
                <div>
                    <button class="btn btn-danger remove-pet-btn" data-index="${index}">Sil</button>
                    <button class="btn btn-primary update-pet-btn" data-index="${index}">Güncelle</button>
                </div>
            `;
            this.petListElement.appendChild(petItem);
        });

        const removePetButtons = document.querySelectorAll('.remove-pet-btn');
        removePetButtons.forEach(button => {
            button.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement;
                const index = parseInt(target.getAttribute('data-index') || '0');
                this.removePet(index);
                this.updatePetList();
                this.savePetsToLocalStorage();
            });
        });

        const updatePetButtons = document.querySelectorAll('.update-pet-btn');
        updatePetButtons.forEach(button => {
            button.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement;
                const index = parseInt(target.getAttribute('data-index') || '0');
                this.updatePet(index);
                this.updatePetList();
                this.savePetsToLocalStorage();
            });
        });
    }

    removePet(index: number) {
        this.pets.splice(index, 1);
    }

    updatePet(index: number) {
        const newPetName = prompt('Yeni evcil hayvan adını girin:');
        if (newPetName) {
            this.pets[index].name = newPetName;
        }
    }

    savePetsToLocalStorage() {
        localStorage.setItem('pets', JSON.stringify(this.pets));
    }

    loadPetsFromLocalStorage() {
        const petsData = localStorage.getItem('pets');
        if (petsData) {
            this.pets = JSON.parse(petsData);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const petListElement = document.getElementById('pet-list')!;
    const createPetButton = document.getElementById('create-pet-btn')! as HTMLButtonElement;

    const petManager = new PetManager(petListElement, createPetButton);
});
