import styles from './Footer.module.css'

export const Footer = ({year}) => {
  return (
    <footer>
      <span>© Chocoladochka Blog - {year}</span>
    </footer>
  );
}
