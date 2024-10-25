<script>
  import Navigation from "./navigation.svelte";
  import { access_token, username, is_login } from "../lib/store";

  import logo from "../img/logo.svg";
  import dropdown from "../img/select.svg";

  let isOpen = false;

  function toggleDropdown(event) {
    isOpen = !isOpen;
  }

  function handleClickOutside(event) {
    if(!event.target.closest('.dropdown')) {
        isOpen = false;
    }
  }

  function create(event) {
    alert("시작하기 click..!");
  }

  function menu(event) {
    alert("AI menu");
  }

  document.addEventListener('click', handleClickOutside);
</script>

<div id="wrap">
  <!-- header -->
    <header id="hd">
        <div class="hd-brand">
      <!-- svelte-ignore a11y-invalid-attribute -->
            <h1 class="logo text-hide">
                <a href=""><img src={logo} alt="INZENT" /></a>
            </h1>
            <button type="button" class="menu-toggler d-none d-lg-block">
                <i class="icon-hamburger-back"></i>
            </button>
            <button type="button" class="menu-toggler d-lg-none">
                <i class="icon-hamburger-back"></i>
            </button>
        </div>
        <ul class="breadcrumb">
            <li class="breadcrumb-item">홈</li>
            <li class="breadcrumb-item active" aria-current="page">회의록 생성</li>
        </ul>
        <label class="ai-menu">
            <button class="btn btn-ai" on:click="{menu}">AI</button>
        </label>
        <div class="hd-side">
            <span class="fw-bolder fs-6">({$username})</span>
            <span class="fs-6">님 환영합니다.</span>
            <button type="button" class="btn-icon" on:click|stopPropagation={toggleDropdown}>
                <img src={dropdown} alt="usermenu">
            </button>
            {#if isOpen}
                <div class="dropdown mt-4">
                    <ul class="dropdown-menu show">
                        <li><button class="btn user-btn">LOG OUT</button></li>
                        <li><button class="btn user-btn">비밀번호 재설정</button></li>
                    </ul>
                </div>
            {/if}
        </div>
    </header>
    <!-- //header -->

    <!-- sidebar -->
    <Navigation />
    <!-- //sidebar -->

    <div id="ct">
        <div class="ct-content" style="display: flex; height: 50vh;">
            <div class="left-panel">
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i>
                    <p class="font-weight-bold fs-6">회의록 내용 입력</p>
                    <label>
                        <input type="file" class="form-control-file" id="fileInput">
                        <span class="btn" for="fileInput">업로드</span>
                    </label>
                    
                </div>
                <textarea class="textarea-basic-md textarea-custom mb-3"></textarea>
            </div>
            <div class="right-panel">
                <div class="sub-bar">
                    <i class="icon-right text-danger"></i>
                    <p class="font-weight-bold fs-6">생성된 회의록</p>
                    <label>
                        <button class="btn btn-create" on:click="{create}">시작하기</button>
                    </label>
                </div>
                <textarea class="textarea-basic-md textarea-custom mb-3"></textarea>
            </div>
        </div>
    </div>
</div>

<style>
    img {
        vertical-align: middle;
    }

    .ai-menu {
        padding-left: 1rem;
    }

    .dropdown {
        position: absolute;
    }

    .dropdown-menu {
        position: absolute;
        background-color: white;
        border: 1px solid #ddd;
        z-index: 1000;
        margin-top: 5px;
        padding: 0;
    }

    .user-btn {
        border-color: white;
    }

    .textarea-custom {
        flex: 1;
        width: 100%;
        resize: none;
    }

    .left-panel {
        flex: 1;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
    }

    .right-panel {
        flex: 1;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
    }

    input[type="file"] {
        display: none;
    }

    .btn-create {
        border-color: #ed3137;
    }

    .btn-ai {
        border-color: #424242;
    }
</style>
