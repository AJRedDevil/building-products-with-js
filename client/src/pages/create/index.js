// npm packages
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

// our packages
import {createQuestion} from '../../store/actions';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  doCreateQuestion: payload => dispatch(createQuestion(payload)),
});

const Create = ({doCreateQuestion}) => {
  let questionText;
  let questionDate;

  const handleCreate = (e) => {
    e.preventDefault();

    const text = questionText.value;
    const expirationDate = moment(questionDate.value).toISOString();
    doCreateQuestion({text, expirationDate});

    return false;
  };

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Brand</Link>
          </div>

          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Browse questions</Link>
            </li>
            <li>
              <Link to="/create"><b>Create new questions</b></Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <form>
          <div className="form-group">
            <label htmlFor="questionText">Question text</label>
            <input
              type="text"
              className="form-control"
              id="questionText"
              placeholder="Question text"
              ref={(t) => { questionText = t; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate">Expiration date</label>
            <input
              type="date"
              className="form-control"
              id="expirationDate"
              placeholder="expirationDate"
              ref={(d) => { questionDate = d; }}
            />
          </div>
          <button type="submit" className="btn btn-default" onClick={handleCreate}>
            Create a new question
          </button>
        </form>
      </div>
    </div>
  );
};
Create.propTypes = {
  doCreateQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
