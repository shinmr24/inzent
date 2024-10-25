<script>
  import { link } from "svelte-spa-router";
  import Select from "svelte-select";

  import select from '../img/select.svg'
  import file from '../img/document.svg'

  let templateOptions = Array.from({ length: 100}, (_, i) => ({
    value: `Option ${i + 1}`,
    label: `Option ${i + 1}`,
  }));

  let modelOptions = Array.from({ length: 100}, (_, i) => ({
    value: `Option ${i + 1}`,
    label: `Option ${i + 1}`,
  }));
</script>

<style>
  .document {
    height: 20px;
  }
</style>

<nav id="sidebar" class="panel">
  <div class="panel-content">
    <div class="sub-bar flex-column align-items-start">
      <div class="fw-semibold mb-2">
        <img src={select} alt="template" class="me-2">
        템플릿
      </div>
      <Select options={templateOptions} placeholder={'select template'} showChevron={true} />
      <div class="fw-semibold mb-2 pt-4">
        <img src={select} alt="model" class="me-2">
        AI 모델
      </div>
      <Select options={modelOptions} placeholder={'select model'} showChevron={true} disabled />
    </div>
    <div class="sub-bar flex-column align-items-start pt-4">
      <div class="fw-semibold mb-2">
        <img src={file} alt="file" class="document">
        문서 생성 기록
      </div>
    </div>
  </div>
</nav>
