
const ScheduleLegend = () => {
  return (
    <div className="mt-4 text-sm text-muted-foreground">
      <p>
        <span className="inline-block h-3 w-3 rounded-full bg-primary/20 mr-1"></span>
        Scheduled
        <span className="inline-block h-3 w-3 rounded-full bg-green-500/20 ml-3 mr-1"></span>
        Completed
        <span className="inline-block h-3 w-3 rounded-full bg-yellow-500/20 ml-3 mr-1"></span>
        In Progress
        <span className="inline-block h-3 w-3 rounded-full bg-secondary/10 ml-3 mr-1"></span>
        Unscheduled
      </p>
    </div>
  );
};

export default ScheduleLegend;
