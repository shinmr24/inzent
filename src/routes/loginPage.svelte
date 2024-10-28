<script>
  import { push } from 'svelte-spa-router'
  import fastapi from '../lib/api'
  import Modal from './passwordReset.svelte'

  import { access_token, username, is_login } from '../lib/store'

  import logo from '../img/logo_wh.svg'
  import productName from '../img/product_name.svg'

  let showModal = false;
  let error = false
  let login_username = ""
  let login_password = ""

  function login(event) {
    event.preventDefault()
    let url = "/user/login"
    let params = {
      username: login_username,
      password: login_password,
    }
    fastapi('login', url, params,
    (json) => {
      $access_token = json.access_token
      $username = json.username
      $is_login = true
      push("/main")
    },
    (json_error) => {
      error = true
    })
  }

  function pwdReset() {
    showModal = !showModal;
  }
</script>

<div id="wrap" class="login">
	<!-- header -->
	<header id="hd">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<h1 class="logo text-hide"><a href=""><img src={logo} alt="INZENT"></a></h1>
	</header>
	<!-- //header -->
	<div id="ct">
		<form class="form-login">
			<img src={productName} alt="ESB">
			<div class="form-group">
				<i class="icon-user"></i>
				<input type="text" class="form-control form-control-lg" id="username" bind:value="{login_username}" placeholder="아이디">
			</div>
			<div class="form-group">
				<i class="icon-lock"></i>
				<input type="password" class="form-control form-control-lg" id="password" bind:value="{login_password}" placeholder="비밀번호">
			</div>
			<label class="custom-control custom-checkbox">
				<input type="checkbox" class="custom-control-input">
				<span class="custom-control-label">아이디 저장</span>
			</label>
      {#if error}
        <div class="alert alert-danger">
          계정 정보가 맞는지 확인해 주세요.
        </div>
      {:else}
        <div></div>
      {/if}
			<button type="submit" class="btn btn-block btn-danger btn-lg" on:click="{login}">로그인</button>
			<!-- <div class="login-menu"> -->
			    <!-- <a href="#modal_membership" class="btn-login" data-toggle="modal">회원가입</a> -->
          <!-- <span>|</span> -->
          <!-- svelte-ignore a11y-invalid-attribute -->
          <!-- <a href="#" class="btn-login" on:click={pwdReset}>비밀번호 재설정</a> -->
			<!-- </div> -->
		</form>
		<p class="copy">&copy; 2020 IZENT. All rights reserved</p>
	</div>
</div>

<!-- <Modal {showModal} on:click={pwdReset} /> -->