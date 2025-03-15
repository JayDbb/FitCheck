import React, { forwardRef } from 'react';
import { MasonryFlashList } from '@shopify/flash-list';

const MasonryFlashListWithRef = forwardRef((props, ref) => (
  <MasonryFlashList ref={ref} {...props} />
));

export default MasonryFlashListWithRef;
