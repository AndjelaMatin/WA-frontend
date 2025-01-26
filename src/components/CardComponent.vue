<template>
  <div class="recept-card">
    <img :src="recept.slika" alt="Slika recepta" class="recept-image" />
    <h2 class="recept-naziv">{{ recept.naziv }}</h2>
    <p><strong>Sastojci:</strong> {{ recept.sastojci.join(", ") }}</p>
    <p><strong>Porcije:</strong> {{ recept.porcije }}</p>
    <div class="recept-interakcije">
      <div class="like-container">
        <button @click="$emit('toggle-like', recept._id)" class="recept-button1">
          <img height="25px" :src="liked ? 'heartda.png' : 'heartne.png'" alt="Heart" />
<span>{{ recept.svidanja }}</span>
</button>
        
      </div>
      <div class="komentar-container">
  <button class="recept-button1" @click="toggleCommentsModal(recept._id)">
    <img
      height="25px"
      :src="commented ? 'commentda.png' : 'commentne.png'"
      alt="Komentari"
    />
    <span>{{ recept.komentari.length }}</span>
  </button>
</div>

<div
 v-if="showCommentsModal && selectedReceptId === recept._id"
  :id="'modal-' + recept._id"
  class="modal-overlay"
  @click.self="toggleCommentsModal"
>
  <div class="modal-content">
    <h3 class="modal-title">Komentari</h3>
    <div class="modal-body">
      <ul v-if="recept.komentari.length > 0" class="comments-list">
        <li v-for="komentar in recept.komentari" :key="komentar.datum" class="comment-item">
          <p class="comment-text">{{ komentar.tekst }}</p>
          <p class="comment-author"><strong>{{ komentar.korisnikIme }}</strong></p>
        </li>
      </ul>
      <p v-else class="no-comments">Nema komentara.</p>
      <textarea 
        v-model="newComment" 
        placeholder="Dodajte komentar..." 
        class="comment-input"
      ></textarea>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" @click="addComment">Dodaj komentar</button>
      <button class="btn btn-secondary" @click="toggleCommentsModal">Zatvori</button>
    </div>
  </div>
</div>

    </div>
    <button class="recept-button" @click="$emit('open-recipe', recept._id)">
      Pogledaj recept
    </button>
    <div v-if="showActions" class="action-buttons">
      <button class="edit-button" @click="$emit('edit-recipe', recept._id)">Uredi</button>
      <button class="delete-button" @click="$emit('delete-recipe', recept._id)">Obriši</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recept:{
      type: Object,
      required: true,
    } ,
    showActions: { 
      type: Boolean,
      default: false,
    },
    liked: {
      type: Boolean,
      required: true,
    },
    commented: {
    type: Boolean,
    required: true,
  },
  },
  data() {
  return {
    showCommentsModal: false, 
    selectedReceptId: null,
    newComment: "", 
  };},
  methods: {
    toggleCommentsModal(receptId = null) {
  if (receptId) {
    this.selectedReceptId = receptId;
  } else {
    console.warn("Nije proslijeđen receptId za otvaranje modala.");
  }
  this.showCommentsModal = !this.showCommentsModal;
},
  addComment() {
    if (!this.newComment.trim()) {
      alert("Komentar ne može biti prazan.");
      return;
    }
    this.$emit("add-comment", this.recept._id, this.newComment); 
    this.newComment = ""; 
    this.toggleCommentsModal();
  },
},
  mounted() {
    console.log("Recept prop:", this.recept);
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fee6c1;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-title {
  font-size: 1.5rem;
  color: #2a231f;
  margin-bottom: 15px;
  font-weight: bold;
}

.modal-body {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  background: #fbf5e5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-text {
  font-size: 1rem;
  color: #2a231f;
  margin-bottom: 5px;
}

.comment-author {
  font-size: 0.9rem;
  color: #c97d60;
}

.no-comments {
  color: #888;
  font-style: italic;
}

.comment-input {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn-primary {
  background-color: #2a231f;
  color: #fff;
}

.btn-primary:hover {
  background-color: #fbf5e5;
  color: #2a231f;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #c94e50;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #ff6b6b;
  transform: scale(1.05);
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.edit-button,
.delete-button {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.edit-button {
  background-color: #2a231f; 
  color: #fff;
}

.edit-button:hover {
  background-color: #fbf5e5; 
  color: #c97d60; 
}

.delete-button {
  background-color: #c94e50; 
  color: #fff;
}

.delete-button:hover {
  background-color: #ff6b6b;
  color: #fff;
}

.recept-card {
  width: 100%;
  max-width: 300px;
  padding: 20px;
  background-color: #fee6c1;
  border: 1px solid #2a231f;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recept-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.recept-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.recept-naziv {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.recept-interakcije {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
}

.like-container,
.komentar-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.recept-button {
  padding: 10px 15px;
  background: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-top: 15px;
  transition: background 0.3s ease;
}
.recept-button1 {
  padding: 10px 15px;
  background: #fee6c1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-top: 15px;
  transition: background 0.3s ease;
}
.recept-button1:hover {
  background: #fbf5e5;
  color: #c97d60;
}
.recept-button:hover {
  background: #fbf5e5;
  color: #c97d60;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

button {
  margin-top: 10px;
}

</style>
