import opn from 'opn';
import { app as config } from '~/configs';

const openBrowser = () => {
  const url = config.uri;

  if (config.openBrowser) {
    opn(url);
  }
};

export default openBrowser;
