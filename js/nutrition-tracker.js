function getDate() {
    const d = new Date();
    const date = document.createElement('div');
    date.className = 'date';
    date.innerHTML = d.toDateString;
}