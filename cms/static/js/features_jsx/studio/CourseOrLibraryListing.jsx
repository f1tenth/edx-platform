/* global gettext */
/* eslint react/no-array-index-key: 0 */
/* 
   McDaniel Dec-2020
   Add a Course Templates box to the course listing. Modify text lables so that actions
   appear more in line with creating a course run from a template.
*/

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export function CourseOrLibraryListing(props) {
  const allowReruns = props.allowReruns;
  const linkClass = props.linkClass;
  const idBase = props.idBase;
  const isSuperuser = props.isSuperuser;
  const templates = props.items.filter( (item)=>item.run==='Template');
  const sections = props.items.filter( (item)=>item.run!='Template');

  function getBookCard( course_number ){
    switch( course_number ){
      case "OS94717200": // OpenStax Prealgebra
        return "https://d3bxy9euw4e147.cloudfront.net/oscms-prodcms/media/documents/prealgebra_1.svg";
      case "OS94717225": // OpenStax Elementary Algebra
        return "https://d3bxy9euw4e147.cloudfront.net/oscms-prodcms/media/documents/elementary-algebra.svg";
      default:
        return "https://avatars2.githubusercontent.com/u/3805549?s=400&v=4"
      }
  }

  let templateList = (      
    <ul className="list-courses list-templates">
    {
      templates.map((item, i) =>
        (
          <li key={i} className="course-item template-item" data-course-key={item.course_key}>
            <a className={"book-block " + linkClass} href={item.rerun_link} alt={"Create new " + item.display_name}>
              <img src={getBookCard(item.number)} alt={item.display_name}></img>
              <h3 className="course-title" id={`title-${idBase}-${i}`}>{item.display_name}</h3>
              <div className="course-metadata rover-template">
                <span className="course-org metadata-item">
                  <span className="label">{gettext('Organization:')}</span>
                  <span className="value">{item.org}</span>
                </span>
                { item.run &&
                <span className="course-run metadata-item">
                  <span className="label">{gettext('Course Run:')}</span>
                  <span className="value">{item.run}</span>
                </span>
                }
                { item.can_edit === false &&
                <span className="extra-metadata">{gettext('(Read-only)')}</span>
                }
              </div>
            </a>
            { isSuperuser && allowReruns && item.lms_link && item.rerun_link &&
            <ul className="item-actions course-actions">
              <li className="action action-edit">
                <a
                  href={item.url}
                  rel="external"
                  className="button view-button"
                  aria-labelledby={`view-live-${idBase}-${i} title-${idBase}-${i}`}
                  id={`view-live-${idBase}-${i}`}
                >{gettext('Edit Template')}</a>
              </li>
            </ul>
            }
          </li>
        )
      )
    }
    </ul>
  )

  let sectionList = (      
    <ul className="list-courses">
    {
      sections.map((item, i) =>
        (
          <li key={i} className="course-item" data-course-key={item.course_key}>
            <a className={linkClass} href={item.url}>
              <h3 className="course-title" id={`title-${idBase}-${i}`}>{item.display_name}</h3>
              <div className="course-metadata custom-course-section">
                { item.run &&
                <span className="course-run metadata-item">
                  <span className="label">{gettext('Course Run:')}</span>
                  <span className="value">{item.run}</span>
                </span>
                }
                { item.can_edit === false &&
                <span className="extra-metadata">{gettext('(Read-only)')}</span>
                }
              </div>
            </a>
            { item.lms_link && item.rerun_link &&
            <ul className="item-actions course-actions">
              { allowReruns &&
              <li className="action action-rerun">
                <a
                  href={item.rerun_link}
                  className="button rerun-button"
                  aria-labelledby={`re-run-${idBase}-${i} title-${idBase}-${i}`}
                  id={`re-run-${idBase}-${i}`}
                >{gettext('Copy Course Section')}</a>
              </li>
              }
              <li className="action action-view">
                <a
                  href={item.lms_link}
                  rel="external"
                  className="button view-button"
                  aria-labelledby={`view-live-${idBase}-${i} title-${idBase}-${i}`}
                  id={`view-live-${idBase}-${i}`}
                >{gettext('Student View')}</a>
              </li>
            </ul>
            }
          </li>
        ),
      )
    }
  </ul>
  )

  if( props.idBase==="course" ){
    return (
      <div>
        {templateList}
        {props.idBase==="course" && <h2 className="my-course-sections-title">My Course Sections</h2>}
        {sectionList}
      </div>
    );
  
  }else{ // archives
    return (
      <div>
        {sectionList}
      </div>
    );  
  }
}

CourseOrLibraryListing.propTypes = {
  allowReruns: PropTypes.bool.isRequired,
  idBase: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkClass: PropTypes.string.isRequired,
  isSuperuser: PropTypes.bool.isRequired,
};