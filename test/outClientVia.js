import sinon from 'sinon';
import {expect} from 'chai';
import {outClientVia} from '..';

describe('outClientVia', () => {

  const type = 'ACTION';

  let cross;
  let next;
  let middleware;

  beforeEach(() => {
    cross = sinon.spy();
    next = sinon.spy();
    middleware = outClientVia(cross)()(next);
  });

  it('should pass to next', () => {
    const action = {type};
    middleware(action);

    expect(cross).to.have.not.been.called;
    expect(next).to.have.been.calledWith(action);
  });

  it('should cross and pass to next', () => {
    const action = {type, meta: {server: true}};
    middleware(action);

    const crossed = {type, meta: {server: true}};
    expect(cross).to.have.been.calledWith(crossed);
    expect(next).to.have.been.calledWith(action);
  });

  it('should cross and stop', () => {
    const action = {type, meta: {server: true, next: false}};
    middleware(action);

    const crossed = {type, meta: {server: true, next: false}};
    expect(cross).to.have.been.calledWith(crossed);
    expect(next).to.have.not.been.called;
  });

  it('should broadcast and pass to next', () => {
    const action = {type, meta: {broadcast: true}};
    middleware(action);

    const crossed = {type, meta: {broadcast: true}};
    expect(cross).to.have.been.calledWith(crossed);
    expect(next).to.have.been.calledWith(action);
  });

  it('should broadcast and stop', () => {
    const action = {type, meta: {broadcast: true, next: false}};
    middleware(action);

    const crossed = {type, meta: {broadcast: true, next: false}};
    expect(cross).to.have.been.calledWith(crossed);
    expect(next).to.have.not.been.called;
  });

});
