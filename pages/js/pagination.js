document.addEventListener('DOMContentLoaded', function() {
    const paginationButtons = document.querySelectorAll('.pagination-button');
    const pageButtons = document.querySelectorAll('.pagination-button:not(.prev):not(.next)');
    
    function handlePageClick(event) {
        pageButtons.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
        console.log('Page clicked:', event.target.textContent);
    }
    
    pageButtons.forEach(button => button.addEventListener('click', handlePageClick));
    
    document.querySelector('.prev').addEventListener('click', function() {
        const activeButton = document.querySelector('.pagination-button.active');
        if (activeButton.previousElementSibling && activeButton.previousElementSibling.classList.contains('pagination-button')) {
            handlePageClick({ target: activeButton.previousElementSibling });
        }
    });
    
    document.querySelector('.next').addEventListener('click', function() {
        const activeButton = document.querySelector('.pagination-button.active');
        if (activeButton.nextElementSibling && activeButton.nextElementSibling.classList.contains('pagination-button')) {
            handlePageClick({ target: activeButton.nextElementSibling });
        }
    });
});
