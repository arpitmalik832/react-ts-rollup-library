import { STORY } from '../../../enums/Button';
import Button from './index';

export default {
  title: STORY.TITLE,
  component: Button,
  tags: [STORY.DOCS_TAG],
};

export const Primary = {
  args: {
    primary: true,
    label: STORY.LABEL,
  },
};
