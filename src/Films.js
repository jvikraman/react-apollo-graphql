import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const filmsQuery = gql`
  query films($director: String!) {
    allFilms(filter: { director_contains: $director }) {
      title
      releaseDate
    }
  }
`;

export default class extends Component {
  state = { director: "" };

  updateDirector = ({ target: { value } }) => {
    this.setState({ director: value });
  };

  render() {
    return (
      <div className="px-2 py-2">
        <label>
          <input
            className="border border-indigo-400 rounded-md mb-2"
            type="text"
            value={this.state.director}
            onChange={this.updateDirector}
          />
        </label>
        <Query query={filmsQuery} variables={{ director: this.state.director }}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            if (data.allFilms === undefined) return null;
            return (
              <ul>
                {data.allFilms.map(({ title, releaseDate }) => (
                  <li key={releaseDate}>{title}</li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}
