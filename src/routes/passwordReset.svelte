<!-- Popup.svelte -->
<script>
  import { push } from 'svelte-spa-router';
  import fastapi from "../lib/api";
  import { access_token, username, is_login } from "../lib/store";

  export let show = false;
  export let close = () => {};

  let password = '';
  let confirmPassword = '';
  let isPasswordMatch = false;

  function checkPassword() {
    isPasswordMatch = password === confirmPassword;
  }

  function resetPassword(event) {
    console.log('재설정 click');
    event.preventDefault()
    let url = "/user/reset-password"
    let params = {
      password1: password,
      password2: confirmPassword,
    }
    fastapi('put', url, params,
      (json) => {
        alert('비밀번호가 재설정 되었습니다. 다시 로그인 해주세요.');
        $access_token = ''
        $username = ''
        $is_login = false
        push("/")
      },
      (json_error) => {
        error = true
      }
    )
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="popup" on:click={close}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="popup-content" on:click|stopPropagation>
      <div class="modal-header">
        <h2 class="modal-title" style="margin: 0 auto;font-size: 1.5rem;">
          비밀번호 재설정
        </h2>
        <button
          type="button"
          class="btn-icon"
          data-dismiss="modal"
          aria-label="Close"
          on:click={close}><i class="icon-close"></i></button
        >
      </div>
      <div class="modal-body">
        <div class="form-group">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="control-label">
            계정
          </label>
          <div style="position: relative">
            <input
              type="text"
              class="form-control form-input"
              placeholder={$username}
              disabled
            />
          </div>
        </div>
        <div class="form-group">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="control-label">
            비밀번호
            <!-- <span class="text-notice-2">영문소문자 포함 | 숫자포함 | 10자 이상</span> -->
          </label>
          <div style="position: relative">
            <img class="input-img" src="img/complete.svg" alt="">
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="**********"
              bind:value={password}
              on:input={checkPassword}
              required />
          </div>
        </div>
        <div class="form-group">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="control-label">
            비밀번호 확인
            {#if !isPasswordMatch}
              <span class="text-notice-1">*비밀번호가 서로 일치하지 않습니다.</span>
            {:else}
              <span class="text-notice-2">*비밀번호가 서로 일치합니다.</span>
            {/if}
          </label>
          <div style="position: relative">
            <img class="input-img" src="img/complete.svg" alt="">
            <input
              id="confirmPassword"
              type="password"
              class="form-control"
              placeholder="**********"
              bind:value={confirmPassword}
              on:input={checkPassword}
              required />
          </div>
        </div>
      </div>
      <div class="modal-footer">
				<button type="button" class="btn btn-primary" on:click={resetPassword}>재설정</button>
			</div>
    </div>
  </div>
{/if}

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
    height: 400px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .btn-icon {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
