import morgan from 'morgan';
import { chWarning, chError, chSuccess } from '@/utils/chalk';

export default morgan((tokens, req, res) => {
  const chStatus = tokens.status(req, res) === '200' ? chSuccess : chError;
  const chTime = tokens['response-time'](req, res) < 100 ? chSuccess : chWarning;
  return [
    chStatus(tokens.status(req, res)),
    chWarning(tokens.method(req, res)),
    tokens.url(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    chTime(tokens['response-time'](req, res), 'ms')
  ].join(' ');
});
