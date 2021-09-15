<template>
  <CCard v-if="columnName != 'id'">
    <CCardHeader>
      <h5>{{ columnName }}</h5>
    </CCardHeader>
    <CCardBody>
      <CInput 
        v-model="visibleName" 
        label="Visible name" 
        type="text" 
        placeholder="Visible name"
        required
      />
      <CSelect
        label="Field type"
        :options="options"
        :value.sync="type"
      />
      <CInput 
        v-model="relationTable" 
        label="Optional relation table name" 
        type="text" 
        placeholder="Optional relation table name"
      />
      <CInput 
        v-model="relationColumn" 
        label="Optional column name in relation table - to print" 
        type="text" 
        placeholder="Optional column name in relation table - to print"
      />
      <CInputCheckbox
        v-model="browse"
        label="Browse"
        value="true"
        :checked="false"
        class="mb-2"
        @update:checked="selectCheckbox('browse')"
      />
      <CInputCheckbox
        v-model="read"
        label="Read"
        value="true"
        :checked="false"
        class="mb-2"
        @update:checked="selectCheckbox('read')"
      />
      <CInputCheckbox
        v-model="edit"
        label="Edit"
        value="true"
        :checked="false"
        class="mb-2"
        @update:checked="selectCheckbox('edit')"
      />
      <CInputCheckbox
        v-model="add"
        label="Add"
        value="true"
        :checked="false"
        class="mb-2"
        @update:checked="selectCheckbox('add')"
      />
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'CreateBreadFieldCard',
  props: {
    columnName: String,
    visibleName: String,
    getData: Boolean,
    options: Array,
  },
  data: () => {
    return {
        type: 'text',
        relationTable: '',
        relationColumn: '',
        browse: null,
        read: null,
        edit: null,
        add: null,
    }
  },
  computed: {

  },
  watch:{
      'getData': function(){
          if(this.getData === true){
            this.getDataFunction()
          }
      }
  },
  methods:{
    selectCheckbox(slug){
      switch(slug){
        case 'browse':
          if(this.browse == true){
            this.browse = false
          }else{
            this.browse = true
          }
        break;
        case 'read':
          if(this.read == true){
            this.read = false
          }else{
            this.read = true
          }
        break;
        case 'edit':
          if(this.edit == true){
            this.edit = false
          }else{
            this.edit = true
          }
        break;
        case 'add':
          if(this.add == true){
            this.add = false
          }else{
            this.add = true
          }
        break;
      }
    },
    getDataFunction(){
          //console.log('getData ' + this.columnName);
        let data = {
            columnName: this.columnName,
            visibleName: this.visibleName,
            type: this.type,
            relationTable: this.relationTable,
            relationColumn: this.relationColumn,
            browse: this.browse,
            read: this.read,
            edit: this.edit,
            add: this.add,
        }
        //if( this.columnName != 'id' ){
          this.$emit('sendData', data)
        //}
    }
  }
}
</script>