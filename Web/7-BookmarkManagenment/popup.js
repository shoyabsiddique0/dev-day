document.addEventListener("DOMContentLoaded", function () {
  const bookmarkNameInput = document.getElementById("bookmarkNameInput");
  const bookmarkUrlInput = document.getElementById("bookmarkUrlInput");
  const addBookmarkButton = document.getElementById("addBookmark");
  const searchInput = document.getElementById("searchInput");
  const bookmarkList = document.getElementById("bookmarkList");

  chrome.storage.sync.get("bookmarks", function (data) {
    const bookmarks = data.bookmarks || [];
    renderBookmarks(bookmarks);
  });

  addBookmarkButton.addEventListener("click", function () {
    const bookmarkName = bookmarkNameInput.value.trim();
    const bookmarkUrl = bookmarkUrlInput.value.trim();
    if (bookmarkName && bookmarkUrl) {
      chrome.storage.sync.get("bookmarks", function (data) {
        let bookmarks = data.bookmarks || [];
        bookmarks.push({ name: bookmarkName, url: bookmarkUrl });
        chrome.storage.sync.set({ bookmarks: bookmarks }, function () {
          bookmarkNameInput.value = "";
          bookmarkUrlInput.value = "";
          renderBookmarks(bookmarks);
        });
      });
    }
  });

  bookmarkList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const bookmarkUrl = event.target.dataset.url;
      chrome.storage.sync.get("bookmarks", function (data) {
        let bookmarks = data.bookmarks || [];
        bookmarks = bookmarks.filter(
          (bookmark) => bookmark.url !== bookmarkUrl
        );
        chrome.storage.sync.set({ bookmarks: bookmarks }, function () {
          renderBookmarks(bookmarks);
        });
      });
    }
  });

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    chrome.storage.sync.get("bookmarks", function (data) {
      const bookmarks = data.bookmarks || [];
      const filteredBookmarks = bookmarks.filter(
        (bookmark) =>
          bookmark.name.toLowerCase().includes(searchTerm) ||
          bookmark.url.toLowerCase().includes(searchTerm)
      );
      renderBookmarks(filteredBookmarks);
    });
  });

  function renderBookmarks(bookmarks) {
    bookmarkList.innerHTML = "";
    bookmarks.forEach((bookmark) => {
      const listItem = document.createElement("li");
      const bookmarkLink = document.createElement("a");
      bookmarkLink.href = bookmark.url;
      bookmarkLink.textContent = `${bookmark.name} (${bookmark.url})`;
      bookmarkLink.target = "_blank";
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.textContent = "Delete";
      deleteButton.dataset.url = bookmark.url;
      listItem.appendChild(bookmarkLink);
      listItem.appendChild(deleteButton);
      bookmarkList.appendChild(listItem);
    });
  }
});
