import React from 'react';


function Header({updateRoute, ...rest}) {
    return ( <>
        
            <div className="collapse bg-dark" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">Creative Blue Media</h4>
                            <p className="text-muted">Add some information about the album below, the author, or any other background
                              context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off
              to some social networking sites or contact information.</p>
                            <div className="copyright">
                                <small>2019&nbsp;&copy;&nbsp; Creative Blue Media</small>
                            </div>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Contact</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                <li><a href="#" className="text-white">Like on Facebook</a></li>
                                <li><a href="#" className="text-white">Email me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-light bg-light shadow-sm">
                <div className="container d-flex justify-content-end">
                    <button className="start-project-btn" type="button" data-toggle="" data-target="#"
                        aria-controls="" aria-expanded="" aria-label="">
                        <b>New Project</b>
                    </button>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader"
                        aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-arrow-down"></i>
                    </button>

                </div>
            </div>
            </>
            )
}

export default Header;