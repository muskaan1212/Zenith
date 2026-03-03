// Wellness Tips & Blog

const wellnessArticles = [
  {
    id: 1,
    title: "10 Tips for Better Sleep",
    category: "sleep",
    excerpt: "Discover proven techniques to improve your sleep quality and wake up refreshed.",
    emoji: "😴",
  },
  {
    id: 2,
    title: "Healthy Eating Habits",
    category: "nutrition",
    excerpt: "Learn about balanced nutrition and how to make healthier food choices.",
    emoji: "🥗",
  },
  {
    id: 3,
    title: "Daily Exercise Routine",
    category: "fitness",
    excerpt: "Simple exercises you can do at home to stay fit and active.",
    emoji: "💪",
  },
  {
    id: 4,
    title: "Stress Management Techniques",
    category: "stress",
    excerpt: "Effective ways to manage stress and improve your mental wellbeing.",
    emoji: "🧘",
  },
  {
    id: 5,
    title: "Mental Health Awareness",
    category: "mental-health",
    excerpt: "Understanding mental health and when to seek professional help.",
    emoji: "🧠",
  },
  {
    id: 6,
    title: "Hydration and Health",
    category: "nutrition",
    excerpt: "Why staying hydrated is crucial for your overall health.",
    emoji: "💧",
  },
]

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  displayWellnessArticles(wellnessArticles)
  setupSearchAndFilter()
})

function setupSearchAndFilter() {
  const searchInput = document.getElementById("wellness-search")
  const categorySelect = document.getElementById("wellness-category")

  searchInput.addEventListener("input", filterArticles)
  categorySelect.addEventListener("change", filterArticles)
}

function filterArticles() {
  const searchTerm = document.getElementById("wellness-search").value.toLowerCase()
  const category = document.getElementById("wellness-category").value

  const filtered = wellnessArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm) || article.excerpt.toLowerCase().includes(searchTerm)
    const matchesCategory = !category || article.category === category
    return matchesSearch && matchesCategory
  })

  displayWellnessArticles(filtered)
}

function displayWellnessArticles(articles) {
  const container = document.getElementById("wellness-articles")

  if (articles.length === 0) {
    container.innerHTML = '<p class="empty-state">No wellness tips found. Try a different search.</p>'
    return
  }

  container.innerHTML = articles
    .map(
      (article) => `
    <div class="wellness-article">
      <div class="article-image">${article.emoji}</div>
      <div class="article-content">
        <div class="article-category">${article.category.replace("-", " ")}</div>
        <h3 class="article-title">${article.title}</h3>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-meta">
          <a href="#" class="wellness-link">Read More →</a>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}
