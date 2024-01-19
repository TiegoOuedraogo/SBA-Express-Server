document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

});

// axios.post('your_endpoint_here', yourDataHere, {
//     headers: {
//         Authorization: `Bearer ${yourTokenHere}` // Replace yourTokenHere with the actual token
//     }
// });

fetch('/recipes/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFhYjlmOGE5NTRmODlmYWVjNTM5ZmMiLCJlbWFpbCI6InRjaGljbzFlckBnbWFpbC5jb20iLCJpYXQiOjE3MDU2ODc5MDgsImV4cCI6MTcwNTc3NDMwOH0.bsReAQJyltt-XsYUQloo1aeALEgTwJNcy8U4vI5NsQs"}` 
    },
    body: JSON.stringify({
        title: 'Your Recipe Title',
        description: 'Your Recipe Description',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        preparation: 'Your Recipe Preparation Steps'
    })
})
.then(response => {
    if (response.ok) {
        window.location.href = '/recipes';
    } else {
        console.error('Server responded with status:', response.status);
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});


// {"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFhYjlmOGE5NTRmODlmYWVjNTM5ZmMiLCJlbWFpbCI6InRjaGljbzFlckBnbWFpbC5jb20iLCJpYXQiOjE3MDU2ODc5MDgsImV4cCI6MTcwNTc3NDMwOH0.bsReAQJyltt-XsYUQloo1aeALEgTwJNcy8U4vI5NsQs"}
