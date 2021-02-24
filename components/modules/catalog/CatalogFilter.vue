<template>
  <div class="filter">
    <form class="filter-form" method="POST">
      <CheckBox class="form-check-box is-margin-top-0" :value="isVinCode" label="Проверенный VIN-код" />
      <div class="check-box-wrapper">
        <CheckBox class="check-box state-number" :value="isVinCode" :isLabel="true">
          <template slot="label">
            <p class="state-number-label">UA<span class="number-label-text">Гос. номер</span></p>
          </template>
        </CheckBox>
      </div>
      <label>Тип транспорта</label>
      <SelectBtn
        :options="brandList"
        :value="brand"
        label="Выбрать"
        :isPrepend="hasType || !type.length"
        :isReset="!!brand.length"
        prependTitle="Выбырите сначало тип"
        @change="selectBrand($event)"
        @focus="checkExistType($event)"
        @reset="resetBrandField"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';
// components
import CheckBox from '~/components/base/CheckBox.vue';
import SelectBtn from '~/components/base/SelectBtn.vue';

@Component({
  components: {
    CheckBox,
    SelectBtn,
  },
})
class CatalogFilter extends Vue {
  get isVinCode() {
    return (state: any) => state.filter.filter.isVinCode;
  }
}

export default CatalogFilter;
</script>

<style lang="scss" scoped>
.filter {
  margin-top: 24px;
  padding: 16px 12px;

  border-radius: 8px;
  background: #f2f7fa;

  .filter-form {
    .check-box {
      margin-top: 12px;

      .state-number-label {
        display: flex;
        align-items: center;

        margin-bottom: 0;
        padding: 0 1px 0 4px;

        height: 24px;

        border-radius: 2px;
        background: #d6e1e7;
        font-size: 13px;
        line-height: 16px;

        .number-label-text {
          padding: 3px 8px;
          margin-left: 4px;

          background: #ffffff;
          font-size: 13px;
          line-height: 16px;
        }
      }
    }

    .is-margin-top-0 {
      margin-top: 0;
    }
  }
}
</style>
