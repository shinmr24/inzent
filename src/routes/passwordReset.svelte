<!-- Popup.svelte -->
<script>
  export let show = false;
  export let close = () => {};
</script>

<style>
  .popup {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
  }

  .popup-content {
      width: 450px;
      height: 450px;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
</style>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="popup" on:click={close}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="popup-content" on:click|stopPropagation>
          <span>비밀번호 재설정 페이지</span>
          <button on:click={close}>닫기</button>
      </div>
  </div>
{/if}