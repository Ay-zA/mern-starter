import PrettyError from 'pretty-error';

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

export default pe;
