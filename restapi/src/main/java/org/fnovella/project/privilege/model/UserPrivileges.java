package org.fnovella.project.privilege.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserPrivileges {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(name="p_program_activation")
	private boolean PProgramActivation;
	@Column(name="p_students_entry")
	private boolean PStudentsEntry;
	@Column(name="p_student_inscription")
	private boolean PStudentInscription;
	@Column(name="p_student_approval")
	private boolean PStudentApproval;
	@Column(name="p_notes_entry")
	private boolean PNotesEntry;
	@Column(name="p_notes_visualization")
	private boolean PNotesVisualization;
	@Column(name="p_assistance_entry")
	private boolean PAssitanceEntry;
	@Column(name="p_assistance_visualization")
	private boolean PAssitanceVisualization;
	@Column(name="p_evaluation_entry")
	private boolean PEvaluationEntry;
	@Column(name="p_evaluation_visualization")
	private boolean PEvaluationVisualization;
	@Column(name="p_monitoring_entry")
	private boolean PMonitoringEntry;
	@Column(name="p_monitoring_visualization")
	private boolean PMonitoringVisualization;
	@Column(name="p_indicators_visualization")
	private boolean PIndicatorsVisualization;
	@Column(name="p_indicators_p_visualization")
	private boolean PIndicatorsPVisualization;
	@Column(name="p_information_visualization")
	private boolean PInformationVisualization;
	@Column(name="p_information_entry")
	private boolean PInformationEntry;
	@Column(name="p_programs_visualization")
	private boolean PProgramsVisualization;
	@Column(name="p_indicators_r_visualization")
	private boolean PIndicatrosRVisualization;
	@Column(name="p_indicators_d_visualization")
	private boolean PIndicatrosDVisualization;
	@Column(name="p_indicators_g_visualization")
	private boolean PIndicatrosGVisualization;
	@Column(name="p_structure_entry")
	private boolean PStructureEntry;
	@Column(name="p_catalogs_entry")
	private boolean PCatalogsEntry;
	@Column(name="p_personal_entry")
	private boolean PPersonalEntry;
	@Column(name="p_personal_evaluation_entry")
	private boolean PPersonalEvaluationEntry;
	@Column(name="p_personal_pass_entry")
	private boolean PPersonalPassEntry;
	@Column(name="p_personal_data_entry")
	private boolean PPersonalDataEntry;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public boolean isPProgramActivation() {
		return PProgramActivation;
	}
	public void setPProgramActivation(boolean pProgramActivation) {
		PProgramActivation = pProgramActivation;
	}
	public boolean isPStudentsEntry() {
		return PStudentsEntry;
	}
	public void setPStudentsEntry(boolean pStudentsEntry) {
		PStudentsEntry = pStudentsEntry;
	}
	public boolean isPStudentInscription() {
		return PStudentInscription;
	}
	public void setPStudentInscription(boolean pStudentInscription) {
		PStudentInscription = pStudentInscription;
	}
	public boolean isPStudentApproval() {
		return PStudentApproval;
	}
	public void setPStudentApproval(boolean pStudentApproval) {
		PStudentApproval = pStudentApproval;
	}
	public boolean isPNotesEntry() {
		return PNotesEntry;
	}
	public void setPNotesEntry(boolean pNotesEntry) {
		PNotesEntry = pNotesEntry;
	}
	public boolean isPNotesVisualization() {
		return PNotesVisualization;
	}
	public void setPNotesVisualization(boolean pNotesVisualization) {
		PNotesVisualization = pNotesVisualization;
	}
	public boolean isPAssitanceEntry() {
		return PAssitanceEntry;
	}
	public void setPAssitanceEntry(boolean pAssitanceEntry) {
		PAssitanceEntry = pAssitanceEntry;
	}
	public boolean isPAssitanceVisualization() {
		return PAssitanceVisualization;
	}
	public void setPAssitanceVisualization(boolean pAssitanceVisualization) {
		PAssitanceVisualization = pAssitanceVisualization;
	}
	public boolean isPEvaluationEntry() {
		return PEvaluationEntry;
	}
	public void setPEvaluationEntry(boolean pEvaluationEntry) {
		PEvaluationEntry = pEvaluationEntry;
	}
	public boolean isPEvaluationVisualization() {
		return PEvaluationVisualization;
	}
	public void setPEvaluationVisualization(boolean pEvaluationVisualization) {
		PEvaluationVisualization = pEvaluationVisualization;
	}
	public boolean isPMonitoringEntry() {
		return PMonitoringEntry;
	}
	public void setPMonitoringEntry(boolean pMonitoringEntry) {
		PMonitoringEntry = pMonitoringEntry;
	}
	public boolean isPMonitoringVisualization() {
		return PMonitoringVisualization;
	}
	public void setPMonitoringVisualization(boolean pMonitoringVisualization) {
		PMonitoringVisualization = pMonitoringVisualization;
	}
	public boolean isPIndicatorsVisualization() {
		return PIndicatorsVisualization;
	}
	public void setPIndicatorsVisualization(boolean pIndicatorsVisualization) {
		PIndicatorsVisualization = pIndicatorsVisualization;
	}
	public boolean isPIndicatorsPVisualization() {
		return PIndicatorsPVisualization;
	}
	public void setPIndicatorsPVisualization(boolean pIndicatorsPVisualization) {
		PIndicatorsPVisualization = pIndicatorsPVisualization;
	}
	public boolean isPInformationVisualization() {
		return PInformationVisualization;
	}
	public void setPInformationVisualization(boolean pInformationVisualization) {
		PInformationVisualization = pInformationVisualization;
	}
	public boolean isPInformationEntry() {
		return PInformationEntry;
	}
	public void setPInformationEntry(boolean pInformationEntry) {
		PInformationEntry = pInformationEntry;
	}
	public boolean isPProgramsVisualization() {
		return PProgramsVisualization;
	}
	public void setPProgramsVisualization(boolean pProgramsVisualization) {
		PProgramsVisualization = pProgramsVisualization;
	}
	public boolean isPIndicatrosRVisualization() {
		return PIndicatrosRVisualization;
	}
	public void setPIndicatrosRVisualization(boolean pIndicatrosRVisualization) {
		PIndicatrosRVisualization = pIndicatrosRVisualization;
	}
	public boolean isPIndicatrosDVisualization() {
		return PIndicatrosDVisualization;
	}
	public void setPIndicatrosDVisualization(boolean pIndicatrosDVisualization) {
		PIndicatrosDVisualization = pIndicatrosDVisualization;
	}
	public boolean isPIndicatrosGVisualization() {
		return PIndicatrosGVisualization;
	}
	public void setPIndicatrosGVisualization(boolean pIndicatrosGVisualization) {
		PIndicatrosGVisualization = pIndicatrosGVisualization;
	}
	public boolean isPStructureEntry() {
		return PStructureEntry;
	}
	public void setPStructureEntry(boolean pStructureEntry) {
		PStructureEntry = pStructureEntry;
	}
	public boolean isPCatalogsEntry() {
		return PCatalogsEntry;
	}
	public void setPCatalogsEntry(boolean pCatalogsEntry) {
		PCatalogsEntry = pCatalogsEntry;
	}
	public boolean isPPersonalEntry() {
		return PPersonalEntry;
	}
	public void setPPersonalEntry(boolean pPersonalEntry) {
		PPersonalEntry = pPersonalEntry;
	}
	public boolean isPPersonalEvaluationEntry() {
		return PPersonalEvaluationEntry;
	}
	public void setPPersonalEvaluationEntry(boolean pPersonalEvaluationEntry) {
		PPersonalEvaluationEntry = pPersonalEvaluationEntry;
	}
	public boolean isPPersonalPassEntry() {
		return PPersonalPassEntry;
	}
	public void setPPersonalPassEntry(boolean pPersonalPassEntry) {
		PPersonalPassEntry = pPersonalPassEntry;
	}
	public boolean isPPersonalDataEntry() {
		return PPersonalDataEntry;
	}
	public void setPPersonalDataEntry(boolean pPersonalDataEntry) {
		PPersonalDataEntry = pPersonalDataEntry;
	}
	public UserPrivileges(boolean pProgramActivation, boolean pStudentsEntry, boolean pStudentInscription,
			boolean pStudentApproval, boolean pNotesEntry, boolean pNotesVisualization, boolean pAssitanceEntry,
			boolean pAssitanceVisualization, boolean pEvaluationEntry, boolean pEvaluationVisualization,
			boolean pMonitoringEntry, boolean pMonitoringVisualization, boolean pIndicatorsVisualization,
			boolean pIndicatorsPVisualization, boolean pInformationVisualization, boolean pInformationEntry,
			boolean pProgramsVisualization, boolean pIndicatrosRVisualization, boolean pIndicatrosDVisualization,
			boolean pIndicatrosGVisualization, boolean pStructureEntry, boolean pCatalogsEntry, boolean pPersonalEntry,
			boolean pPersonalEvaluationEntry, boolean pPersonalPassEntry, boolean pPersonalDataEntry) {
		super();
		PProgramActivation = pProgramActivation;
		PStudentsEntry = pStudentsEntry;
		PStudentInscription = pStudentInscription;
		PStudentApproval = pStudentApproval;
		PNotesEntry = pNotesEntry;
		PNotesVisualization = pNotesVisualization;
		PAssitanceEntry = pAssitanceEntry;
		PAssitanceVisualization = pAssitanceVisualization;
		PEvaluationEntry = pEvaluationEntry;
		PEvaluationVisualization = pEvaluationVisualization;
		PMonitoringEntry = pMonitoringEntry;
		PMonitoringVisualization = pMonitoringVisualization;
		PIndicatorsVisualization = pIndicatorsVisualization;
		PIndicatorsPVisualization = pIndicatorsPVisualization;
		PInformationVisualization = pInformationVisualization;
		PInformationEntry = pInformationEntry;
		PProgramsVisualization = pProgramsVisualization;
		PIndicatrosRVisualization = pIndicatrosRVisualization;
		PIndicatrosDVisualization = pIndicatrosDVisualization;
		PIndicatrosGVisualization = pIndicatrosGVisualization;
		PStructureEntry = pStructureEntry;
		PCatalogsEntry = pCatalogsEntry;
		PPersonalEntry = pPersonalEntry;
		PPersonalEvaluationEntry = pPersonalEvaluationEntry;
		PPersonalPassEntry = pPersonalPassEntry;
		PPersonalDataEntry = pPersonalDataEntry;
	}
	public UserPrivileges() {
		super();
	}
	
}