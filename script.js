
let currentFilter = 'all';
let allItems = [];

// Loads all todo items from Firestore and updates the UI
function getItems(){
    db.collection("todo-items").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        allItems = [];
        snapshot.docs.forEach((doc) => {
            allItems.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(filterItems(allItems));
        updateItemsCount();
    })
}

// Filters items based on the current filter (all, active, completed)
function filterItems(items) {
    switch(currentFilter) {
        case 'active':
            return items.filter(item => item.status === 'active');
        case 'completed':
            return items.filter(item => item.status === 'completed');
        default:
            return items;
    }
}

function updateItemsCount() {
    const activeItems = allItems.filter(item => item.status === 'active');
    document.getElementById('items-count').textContent = activeItems.length;
}

function generateItems(items){
    let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.setAttribute('data-id', item.id);
        
        // Check container
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark", "neon-check");
        checkMark.innerHTML = '<div class="check-icon">✓</div><div class="pulse-ring"></div>';
        checkMark.addEventListener("click", function(){
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        // Todo text container
        let todoTextContainer = document.createElement("div");
        todoTextContainer.classList.add("todo-text-container");
        
        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;
        
        // Edit input (hidden by default)
        let editInput = document.createElement("input");
        editInput.classList.add("edit-input");
        editInput.type = "text";
        editInput.value = item.text;
        editInput.style.display = "none";
        
        todoTextContainer.appendChild(todoText);
        todoTextContainer.appendChild(editInput);
        
        // Actions container
        let actionsContainer = document.createElement("div");
        actionsContainer.classList.add("todo-actions");
        
        let editBtn = document.createElement("button");
        editBtn.classList.add("action-btn", "edit-btn");
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener("click", function(e){
            e.stopPropagation();
            startEdit(item.id, todoText, editInput, editBtn);
        });
        
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("action-btn", "delete-btn");
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.addEventListener("click", function(e){
            e.stopPropagation();
            deleteItem(item.id);
        });
        
        actionsContainer.appendChild(editBtn);
        actionsContainer.appendChild(deleteBtn);

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
            todoItem.classList.add("completed");
        }
        
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoTextContainer);
        todoItem.appendChild(actionsContainer);
        todoItems.push(todoItem)
    })
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}



function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let inputValue = text.value.trim();
    const addBtn = document.querySelector('.add-btn');
    
    // Validate input
    if(inputValue === '') {
        // Show error feedback
        addBtn.classList.add('error');
        text.classList.add('error-input');
        setTimeout(() => {
            addBtn.classList.remove('error');
            text.classList.remove('error-input');
        }, 500);
        return;
    }
    
    // Disable button during submission to prevent double-clicks
    addBtn.disabled = true;
    addBtn.classList.add('processing');
    
    // Add item to Firestore
    db.collection("todo-items").add({
        text: inputValue,
        status: "active",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Item added successfully");
        // Clear input field
        text.value = "";
        
        // Add visual success feedback
        addBtn.classList.remove('processing');
        addBtn.classList.add('success');
        setTimeout(() => {
            addBtn.classList.remove('success');
            addBtn.disabled = false;
        }, 300);
    })
    .catch((error) => {
        console.error("Error adding item: ", error);
        
        // Add visual error feedback
        addBtn.classList.remove('processing');
        addBtn.classList.add('error');
        
        // Show error message to user
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-message');
        errorMsg.textContent = 'Failed to add task. Please try again.';
        text.parentNode.appendChild(errorMsg);
        
        setTimeout(() => {
            addBtn.classList.remove('error');
            addBtn.disabled = false;
            errorMsg.remove();
        }, 3000);
    });
}

function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            const newStatus = doc.data().status === "active" ? "completed" : "active";
            item.update({
                status: newStatus,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    })
}

function startEdit(id, todoText, editInput, editBtn) {
    todoText.style.display = "none";
    editInput.style.display = "block";
    editInput.focus();
    editInput.select();
    editBtn.innerHTML = "💾";
    
    const saveEdit = () => {
        const newText = editInput.value.trim();
        if(newText && newText !== todoText.innerText) {
            updateItem(id, newText);
        }
        cancelEdit(todoText, editInput, editBtn);
    };
    
    const cancelEdit = (text, input, btn) => {
        text.style.display = "block";
        input.style.display = "none";
        btn.innerHTML = "✏️";
        input.value = text.innerText;
    };
    
    editInput.addEventListener("keydown", function(e) {
        if(e.key === "Enter") {
            saveEdit();
        } else if(e.key === "Escape") {
            cancelEdit(todoText, editInput, editBtn);
        }
    });
    
    editInput.addEventListener("blur", saveEdit);
    
    editBtn.onclick = function(e) {
        e.stopPropagation();
        saveEdit();
    };
}

function updateItem(id, newText) {
    db.collection("todo-items").doc(id).update({
        text: newText,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Item updated successfully");
    }).catch((error) => {
        console.error("Error updating item: ", error);
    });
}

function deleteItem(id) {
    if(confirm("Are you sure you want to delete this mission?")) {
        db.collection("todo-items").doc(id).delete().then(() => {
            console.log("Item deleted successfully");
        }).catch((error) => {
            console.error("Error deleting item: ", error);
        });
    }
}

function clearCompleted() {
    const completedItems = allItems.filter(item => item.status === 'completed');
    const batch = db.batch();
    
    completedItems.forEach(item => {
        const docRef = db.collection("todo-items").doc(item.id);
        batch.delete(docRef);
    });
    
    batch.commit().then(() => {
        console.log("Completed items cleared");
    }).catch((error) => {
        console.error("Error clearing completed items: ", error);
    });
}

// Event listeners for filter buttons
document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            generateItems(filterItems(allItems));
        });
    });
    
    // Clear completed button
    document.querySelector('.clear-btn').addEventListener('click', clearCompleted);
    
    // Theme toggle (placeholder for future implementation)
    document.querySelector('.theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
    });
    
    // Ensure form submission is properly handled
    const todoForm = document.querySelector('.new-todo-input form');
    if (todoForm) {
        // Remove the inline onsubmit attribute to avoid double submission
        todoForm.removeAttribute('onsubmit');
        todoForm.addEventListener('submit', addItem);
    }
});

// Initialize form submission handler immediately to avoid race conditions
const todoForm = document.querySelector('.new-todo-input form');
if (todoForm && !todoForm.hasAttribute('data-initialized')) {
    todoForm.setAttribute('data-initialized', 'true');
    todoForm.addEventListener('submit', addItem);
}

getItems();