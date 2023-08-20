var Pet = /** @class */ (function () {
    function Pet(name, type, age, gender, color) {
        this.name = name;
        this.type = type;
        this.age = age;
        this.gender = gender;
        this.color = color;
    }
    return Pet;
}());
var PetManager = /** @class */ (function () {
    function PetManager(petListElement, createPetButton) {
        var _this = this;
        this.petListElement = petListElement;
        this.createPetButton = createPetButton;
        this.pets = [];
        this.loadPetsFromLocalStorage();
        this.createPetButton.addEventListener('click', function () {
            _this.createPet();
            _this.updatePetList();
            _this.savePetsToLocalStorage();
        });
        this.updatePetList();
    }
    PetManager.prototype.createPet = function () {
        var petNameInput = document.getElementById('pet-name');
        var petTypeInput = document.getElementById('pet-type');
        var petAgeInput = document.getElementById('pet-age');
        var petGenderInput = document.getElementById('pet-gender');
        var petColorInput = document.getElementById('pet-color');
        var petName = petNameInput.value;
        var petType = petTypeInput.value;
        var petAge = parseInt(petAgeInput.value);
        var petGender = petGenderInput.value;
        var petColor = petColorInput.value;
        if (petName.trim() === '' || petType.trim() === '' || isNaN(petAge) || petGender.trim() === '' || petColor.trim() === '') {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        var newPet = new Pet(petName, petType, petAge, petGender, petColor);
        this.pets.push(newPet);
        // Clear input fields after adding a pet
        petNameInput.value = '';
        petAgeInput.value = '';
        petColorInput.value = '';
    };
    PetManager.prototype.updatePetList = function () {
        var _this = this;
        this.petListElement.innerHTML = '';
        this.pets.forEach(function (pet, index) {
            var petItem = document.createElement('li');
            petItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            petItem.innerHTML = "\n                <span>".concat(pet.name, " (").concat(pet.type, ") - ").concat(pet.age, " ya\u015F, ").concat(pet.gender, ", Renk: ").concat(pet.color, "</span>\n                <div>\n                    <button class=\"btn btn-danger remove-pet-btn\" data-index=\"").concat(index, "\">Sil</button>\n                    <button class=\"btn btn-primary update-pet-btn\" data-index=\"").concat(index, "\">G\u00FCncelle</button>\n                </div>\n            ");
            _this.petListElement.appendChild(petItem);
        });
        var removePetButtons = document.querySelectorAll('.remove-pet-btn');
        removePetButtons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                var target = event.target;
                var index = parseInt(target.getAttribute('data-index') || '0');
                _this.removePet(index);
                _this.updatePetList();
                _this.savePetsToLocalStorage();
            });
        });
        var updatePetButtons = document.querySelectorAll('.update-pet-btn');
        updatePetButtons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                var target = event.target;
                var index = parseInt(target.getAttribute('data-index') || '0');
                _this.updatePet(index);
                _this.updatePetList();
                _this.savePetsToLocalStorage();
            });
        });
    };
    PetManager.prototype.removePet = function (index) {
        this.pets.splice(index, 1);
    };
    PetManager.prototype.updatePet = function (index) {
        var newPetName = prompt('Yeni evcil hayvan adını girin:');
        if (newPetName) {
            this.pets[index].name = newPetName;
        }
    };
    PetManager.prototype.savePetsToLocalStorage = function () {
        localStorage.setItem('pets', JSON.stringify(this.pets));
    };
    PetManager.prototype.loadPetsFromLocalStorage = function () {
        var petsData = localStorage.getItem('pets');
        if (petsData) {
            this.pets = JSON.parse(petsData);
        }
    };
    return PetManager;
}());
document.addEventListener('DOMContentLoaded', function () {
    var petListElement = document.getElementById('pet-list');
    var createPetButton = document.getElementById('create-pet-btn');
    var petManager = new PetManager(petListElement, createPetButton);
});
