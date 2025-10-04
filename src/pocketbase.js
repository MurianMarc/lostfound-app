import PocketBase from 'pocketbase';

const pb = new PocketBase('https://your-backend.onrender.com');
export default pb;



await pb.collection('users').create({
  email: "student1@example.com",
  password: "mypassword",
  passwordConfirm: "mypassword",
  name: "Student One"
});


await pb.collection('users').authWithPassword("student1@example.com", "mypassword");

const formData = new FormData();
formData.append('title', "Blue Water Bottle");
formData.append('description', "Blue bottle with sticker");
formData.append('status', "found");
formData.append('photo', fileInput.files[0]); 
formData.append('owner', pb.authStore.model.id); 

await pb.collection('items').create(formData);

const response = await fetch("https://api-inference.huggingface.co/models/google/vit-base-patch16-224", {
  headers: { Authorization: "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" },
  method: "POST",
  body: fileInput.files[0],
});
const result = await response.json();
console.log(result); 

const results = await pb.collection('items').getList(1, 20, {
  filter: 'title ~ "bottle" || description ~ "blue" || tags ?~ "bottle"',
});
console.log(results.items);

