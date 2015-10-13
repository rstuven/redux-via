import sinon from 'sinon';
import {expect} from 'chai';
import {inClientVia} from '..';

describe('inClientVia', () => {

  const type = 'ACTION';

  let dispatch;

  beforeEach(() => {
    dispatch = sinon.spy();
  });

  it('should dispatch', () => {
    const action = {type};
    inClientVia(dispatch, action);

    const dispatched = {type};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

  it('should remove server before dispatch', () => {
    const action = {type, meta: {server: true}};
    inClientVia(dispatch, action);

    const dispatched = {type, meta: {}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

  it('should remove broadcast before dispatch', () => {
    const action = {type, meta: {broadcast: true}};
    inClientVia(dispatch, action);

    const dispatched = {type, meta: {}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

  it('should remove next before dispatch', () => {
    const action = {type, meta: {next: false}};
    inClientVia(dispatch, action);

    const dispatched = {type, meta: {}};
    expect(dispatch).to.have.been.calledWith(dispatched);
  });

});
