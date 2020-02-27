module.exports = {
  name: 'hub',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/hub',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
