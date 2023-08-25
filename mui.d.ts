declare module '@mui/material/styles' {
	interface Palette {
	  custom: Palette['white'];
	}
  
	interface PaletteOptions {
	  custom?: PaletteOptions['white'];
	}
}