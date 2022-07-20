<template>
  <input ref="inputRef" type="text" class="form-control" />
</template>

<script>
import { watch } from "@vue/composition-api";
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    value: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: () => ({
        currency: "IDR",
        locale: "id-ID",
        currencyDisplay: "narrowSymbol",
        hideCurrencySymbolOnFocus: false,
        hideGroupingSeparatorOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: false
      })
    }
  },
  setup(props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options);

    watch(
      () => props.value,
      value => {
        setValue(value);
      }
    );

    watch(
      () => props.options,
      options => {
        setOptions(options);
      }
    );

    return { inputRef };
  }
};
</script>
