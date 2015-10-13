import sinon from 'sinon';
import {expect} from 'chai';
import {inServerVia} from '..';

describe('inServerVia', () => {

  const type = 'ACTION';
  const client = '12345';

  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  it('should dispatch', () => {
    const action = {type};
    inServerVia(dispatch, action, client);

    const dispatched = {type, meta: {client}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

  it('should set the client identifier before dispatch', () => {
    const action = {type, meta: {}};
    inServerVia(dispatch, action, client);

    const dispatched = {type, meta: {client}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

  it('should remove server before dispatch', () => {
    const action = {type, meta: {server: true}};
    inServerVia(dispatch, action, client);

    const dispatched = {type, meta: {client}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

  it('should not remove broadcast before dispatch', () => {
    const action = {type, meta: {broadcast: true}};
    inServerVia(dispatch, action, client);

    const dispatched = {type, meta: {broadcast: true, client}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

  it('should remove next before dispatch', () => {
    const action = {type, meta: {next: false}};
    inServerVia(dispatch, action, client);

    const dispatched = {type, meta: {client}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

});
