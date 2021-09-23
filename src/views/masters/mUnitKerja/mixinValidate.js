export default {
  methods: {
    validateString(data, options){
      if(data.val && (data.val.trim().length >= options.length)) {
        data.isValid = true
      }else {
        data.isValid = false
      }
    },
    validateNip(data, options){
      if(data.val && (data.val.trim().length == options.length)) {
        data.isValid = true
      }else {
        data.isValid = false
      }
    },
    validateNumber(data){
      if(data.val) {
        data.isValid = true
      }else {
        data.isValid = false
      }
    },
    validateTelpon(data){
      const phoneRegex = /^(^62)(\d{3,4}-?){2}\d{3,4}$/
      if(phoneRegex.test(data.val)) {
        data.isValid = true
      }else {
        data.isValid = false
      }
    }
  }
}