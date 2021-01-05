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
      case "4Weeks":
        return "https://cdn.f1tenth.org/course_templates/LMS_Template_Logo_400px_4weeks.png";
      case "10Weeks":
        return "https://cdn.f1tenth.org/course_templates/LMS_Template_Logo_400px_10weeks.png";
      case "15Weeks":
        return "https://cdn.f1tenth.org/course_templates/LMS_Template_Logo_400px_15weeks.png";
      default:
        return "https://cdn.f1tenth.org/course_templates/LMS_Template_Logo_400px_4weeks.png"
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