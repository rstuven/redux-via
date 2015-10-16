import sinon from 'sinon';
import {expect} from 'chai';
import {outServerVia} from '..';

describe('outServerVia', () => {

  const type = 'ACTION';
  const client = '12345';

  let cross;
  let next;
  let middleware;

  beforeEach(() => {
    cross = sinon.spy();
    next = sinon.spy();
    middleware = outServerVia(cross)()(next);
  });

  it('default', () => {
    const action = {type};
    middleware(action);

    expect(cross).to.have.not.been.called;
    expect(next).to.have.been.calledWith(action);
  });

  it('broadcast and next', () => {
    const action = {type, meta: {broadcast: true}};
    middleware(action);

    const crossed = {type, meta: {broadcast: true}};
    expect(cross).to.have.been.calledWith(crossed, true, undefined);
    expect(next).to.have.been.calledWith(action);
  });

  it('not broadcast and next', () => {
    const action = {type, meta: {broadcast: false, next: false}}; // ignore `next` value
    middleware(action);

    expect(cross).to.have.not.been.called;
    expect(next).to.have.been.calledWith(action);
  });

  it('broadcast, client and next', () => {
    const action = {type, meta: {broadcast: true, client}};
    middleware(action);

    const crossed = {type, meta: {broadcast: true, client}};
    expect(cross).to.have.been.calledWith(crossed, true, client);
    expect(next).to.have.been.calledWith(action);
  });

  it('broadcast and stop', () => {
    const action = {type, meta: {broadcast: true, next: false}};
    middleware(action);

    const crossed = {type, meta: {broadcast: true, next: false}};
    expect(cross).to.have.been.calledWith(crossed, true, undefined);
    expect(next).to.have.not.been.called;
  });

  it('broadcast, client and stop', () => {
    const action = {type, meta: {broadcast: true, next: false, client}};
    middleware(action);

    const crossed = {type, meta: {broadcast: true, next: false, client}};
    expect(cross).to.have.been.calledWith(crossed, true, client);
    expect(next).to.have.not.been.called;
  });

  it('client and next', () => {
    const action = {type, meta: {client: client}};
    middleware(action);

    const crossed = {type, meta: {client: client}};
    expect(cross).to.have.been.calledWith(crossed, undefined, client);
    expect(next).to.have.been.calledWith(action);
  });

  it('client and stop', () => {
    const action = {type, meta: {client: client, next: false}};
    middleware(action);

    const crossed = {type, meta: {client: client, next: false}};
    expect(cross).to.have.been.calledWith(crossed, undefined, client);
    expect(next).to.have.not.been.called;
  });

});
