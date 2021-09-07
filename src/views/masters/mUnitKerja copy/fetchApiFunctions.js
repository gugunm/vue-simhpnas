export const loadItemsComponent = async ({
  refresh = null, 
  self = null,
  params = {},
  storeAction = '', 
  storeGetter = ''
}) => {
  self.loading = true;
  try {
    if (params) {
      await self.$store.dispatch(storeAction, {
        ...params,
        forceRefresh: refresh,
      });
    } else {
      await self.$store.dispatch(storeAction, {
        forceRefresh: refresh,
      });
    }
    self.items = self.$store.getters[storeGetter]; 
  } catch (error) {
    self.error = error.message || 'Something went wrong!';
  }
  self.loading = false;
}

