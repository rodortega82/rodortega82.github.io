function resizeMasonryItem(item) {
    const masonryContent = item.querySelector('.masonry-content');
    if (!masonryContent) {
        console.error('No masonry-content found in item:', item);
        return;
    }

    const grid = document.querySelector('.masonry');
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

    // Only calculate based on height since width is fixed
    const rowSpan = Math.ceil((masonryContent.offsetHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
}

function resizeAllMasonryItems() {
    const allItems = document.querySelectorAll('.grid-item');
    allItems.forEach(item => resizeMasonryItem(item));
}

window.onload = function() {
    resizeAllMasonryItems();

    // Resize on window resize event
    window.addEventListener('resize', debounce(resizeAllMasonryItems, 100));
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
