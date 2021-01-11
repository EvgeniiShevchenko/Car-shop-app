<template>
  <div class="ask mt-8">
    <div class="ask-preview-wrapper">
      <div class="preview">
        <img class="preview-icon" src="~/assets/images/car-ask-frame.png" />
      </div>
      <h3 class="preview-title">Иванов Иван Иванович</h3>
    </div>
    <p class="ask-label mt-4">Предложение:</p>
    <div class="ask-target mt-2">2007 Toyota FJ Cruiser (авто из США)</div>
    <p class="ask-label mt-4">Комментарий</p>
    <textarea class="ask-field" name="" id="" cols="30" rows="10" placeholder="Текст комментария"></textarea>
    <button class="ask-btn mt-4" type="button">Задать вопрос</button>
  </div>
</template>

<script>
export default {
  name: 'CarAsk',
};
</script>

<style lang="scss" scoped>
.ask {
  .ask-preview-wrapper {
    display: flex;
    align-items: center;

    .preview {
      height: 36px;
      width: 36px;

      .preview-icon {
        height: 100%;
        width: 100%;
      }
    }

    .preview-title {
      margin-left: 8px;
      @include init-title(#4a4d5c, 14px, 500, 17px);
    }
  }

  .ask-label {
    @include init-title(#4a4d5c, 15px, 400, 17px);
  }

  .ask-target {
  }

  .ask-field {
    @extend .text-area-classic;
    margin-top: 6px;
    max-height: 82px;
  }

  .ask-btn {
    @extend .accept-green-btn;
  }
}
</style>
