export function Main() {
  return `
    <main>
      <div class="main-content">
        <div class="category-item heart" role="button" aria-label="Verificar a saúde do sistema">
          <img src="/frontend/src/assets/heart-icon.png" alt="Verificar Saúde" />
        </div>
        <div class="progress-bar-container" aria-live="polite">
          <div id="progressBar" class="progress-bar"></div>
        </div>
        <p id="status" aria-live="polite"></p>
      </div>
    </main>
  `;
}
