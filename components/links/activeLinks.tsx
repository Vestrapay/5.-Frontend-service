import React, {Children, ReactElement} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {ActiveLinkProps} from "@types";


const ActiveLinks = ({href,children, activeClassName, ...props}: ActiveLinkProps) => {

    const {asPath} = useRouter();
    const child = Children.only(children) as ReactElement;
    const childClassName = child.props.className || '';
    const className = href === asPath || props.as === asPath ? `${childClassName} ${activeClassName}`.trim() : childClassName;


    return (
        <Link href={href} onClick={props.onClick} {...props}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    );
};


export default ActiveLinks;