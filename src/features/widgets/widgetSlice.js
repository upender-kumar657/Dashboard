import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 'cat1',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'w1', name: 'Widget A', content: 'This is Widget A', type: 'text' },
        { id: 'w2', name: 'Sales Chart', content: [100, 200, 300], type: 'chart' }
      ]
    }
  ],
  searchQuery: ''
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, name, content, type } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push({ id: nanoid(), name, content, type });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { addWidget, removeWidget, setSearchQuery } = widgetSlice.actions;
export default widgetSlice.reducer;